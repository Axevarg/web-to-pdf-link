import { jsPDF } from "jspdf";
import QRCode from "qrcode";

import logoAsset from "@/assets/uaeh-logo.png.asset.json";
import fotoAsset from "@/assets/foto-axel.jpg.asset.json";

const UAEH_RED: [number, number, number] = [206, 17, 38];
const UAEH_DARK: [number, number, number] = [123, 17, 19];
const GRAY_LINE: [number, number, number] = [190, 190, 190];

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generarComprobantePdf(qrTarget: string) {
  const W = 355;
  const H = 637;
  const doc = new jsPDF({ unit: "px", format: [W, H], orientation: "portrait" });

  const [logo, foto, qr] = await Promise.all([
    toDataUrl(logoAsset.url),
    toDataUrl(fotoAsset.url),
    QRCode.toDataURL(qrTarget, { margin: 1, width: 600 }),
  ]);

  // Borde punteado lateral
  doc.setDrawColor(...UAEH_RED);
  doc.setLineDashPattern([2, 3], 0);
  doc.line(6, 6, 6, H - 6);
  doc.line(W - 6, 6, W - 6, H - 6);
  doc.setLineDashPattern([], 0);

  // Encabezado rojo
  doc.setFillColor(...UAEH_RED);
  doc.rect(12, 12, W - 24, 78, "F");
  doc.addImage(logo, "PNG", 26, 25, 120, 56);
  doc.setDrawColor(255, 255, 255);
  doc.line(168, 28, 168, 74);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Dirección de", 180, 40);
  doc.text("Administración", 180, 54);
  doc.text("Escolar", 180, 68);

  // Título
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(15);
  doc.text("Comprobante de inscripción", 26, 122);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("JULIO-DICIEMBRE 2026", 26, 152);

  // Bloque de datos del alumno
  doc.setFillColor(...UAEH_RED);
  doc.rect(26, 170, 220, 118, "F");
  doc.addImage(foto, "JPEG", 246, 170, 83, 118);
  doc.setFillColor(...UAEH_DARK);
  doc.rect(26, 170, 120, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Número de cuenta", 40, 188);
  doc.setFontSize(14);
  doc.text("423203", 172, 189);
  doc.setFontSize(10);
  doc.text("VARGAS BAUTISTA", 40, 228);
  doc.text("AXEL GABRIEL", 40, 256);

  // Tabla institucional
  const tableTop = 310;
  doc.setDrawColor(...GRAY_LINE);
  doc.setLineWidth(0.6);
  doc.rect(26, tableTop, W - 52, 28);
  doc.rect(26, tableTop + 28, W - 52, 28);
  doc.rect(26, tableTop + 56, W - 52, 28);
  doc.line(103, tableTop + 56, 103, tableTop + 84);
  doc.line(180, tableTop + 56, 180, tableTop + 84);
  doc.line(257, tableTop + 56, 257, tableTop + 84);

  doc.setTextColor(...UAEH_DARK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Instituto de Ciencias Sociales y Humanidades", W / 2, tableTop + 18, {
    align: "center",
  });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Licenciatura en Ciencias de la Educación (2014)", W / 2, tableTop + 46, {
    align: "center",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Semestre", 64, tableTop + 74, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text("7", 141, tableTop + 74, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text("Grupo", 218, tableTop + 74, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text("1", 295, tableTop + 74, { align: "center" });

  // Código QR
  doc.addImage(qr, "PNG", (W - 130) / 2, 440, 130, 130);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("Carga académica", W / 2, 586, { align: "center" });

  // Pie
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text("uaeh", W - 76, 612);
  doc.setTextColor(...UAEH_RED);
  doc.text(".edu.mx", W - 76 + doc.getTextWidth("uaeh"), 612);

  doc.save("comprobante-inscripcion-423203.pdf");
}
