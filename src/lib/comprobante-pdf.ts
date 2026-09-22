import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import fotoAsset from "@/assets/foto-axel.jpg.asset.json";

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar la imagen: ${url}`);
  const blob = await res.blob();
  if (!blob.type.startsWith("image/")) throw new Error("La fotografía no está disponible.");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generarComprobantePdf(qrTarget: string) {
  // Coordinates follow the 231 × 428 reference, independent of screen size.
  const W = 231;
  const H = 428;
  const doc = new jsPDF({ unit: "px", format: [305, H], hotfixes: ["px_scaling"] });
  const [header, foto, qr] = await Promise.all([
    toDataUrl("/uaeh-escolar.png"),
    toDataUrl(fotoAsset.url),
    QRCode.toDataURL(qrTarget, { margin: 0, width: 600, errorCorrectionLevel: "M" }),
  ]);
  const text = (
    value: string,
    x: number,
    y: number,
    size: number,
    bold = false,
    center = false,
  ) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size * 0.75);
    doc.text(value, x + 38, y, center ? { align: "center" } : undefined);
  };

  doc.addImage(header, "PNG", 38, 0, W, 70);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(38.5, 70, 38.5, H - 0.5);
  doc.line(W + 37.5, 70, W + 37.5, H - 0.5);
  doc.line(38.5, H - 0.5, W + 37.5, H - 0.5);
  doc.setTextColor(0, 0, 0);
  text("Comprobante de inscripción", 11, 100, 11);
  text("JULIO-DICIEMBRE 2026", 11, 124, 13, true);

  doc.setFillColor(242, 0, 48);
  doc.rect(49, 135, 152, 67, "F");
  doc.setFillColor(211, 0, 45);
  doc.rect(49, 135, 152, 25, "F");
  doc.setFillColor(183, 0, 39);
  doc.rect(49, 135, 82, 25, "F");
  // Crop to fill the portrait slot without distorting the original photo.
  const photo = doc.getImageProperties(foto);
  const scale = Math.max(55 / photo.width, 67 / photo.height);
  doc.saveGraphicsState();
  doc.rect(201, 135, 55, 67);
  doc.clip();
  doc.discardPath();
  doc.addImage(
    foto,
    "JPEG",
    201 + (55 - photo.width * scale) / 2,
    135 + (67 - photo.height * scale) / 2,
    photo.width * scale,
    photo.height * scale,
  );
  doc.restoreGraphicsState();
  doc.setTextColor(255, 255, 255);
  text("Número de cuenta", 52, 150, 6.5, true, true);
  text("423203", 128, 151, 12, true, true);
  text("VARGAS BAUTISTA", 13, 173, 6.5, true);
  text("AXEL GABRIEL", 13, 191, 6.5, true);

  doc.setTextColor(0, 0, 0);
  doc.setFillColor(246, 246, 243);
  doc.rect(38.5, 214, 230, 19, "FD");
  doc.setFillColor(235, 235, 235);
  doc.rect(38.5, 233, 230, 20, "FD");
  doc.rect(38.5, 253, 230, 18);
  for (const x of [67, 113, 177]) doc.line(x + 38, 253, x + 38, 271);
  text("Instituto de Ciencias Sociales y Humanidades", W / 2, 226, 6.5, false, true);
  text("Licenciatura en Ciencias de la Educación (2014)", W / 2, 246, 8, true, true);
  text("Semestre", 34, 265, 7, false, true);
  text("7", 90, 265, 7, true, true);
  text("Grupo", 145, 265, 7, false, true);
  text("1", 204, 265, 7, true, true);

  doc.addImage(qr, "PNG", 113, 300, 78, 78);
  doc.link(113, 300, 78, 90, { url: qrTarget });
  text("Carga académica", 114, 389, 8, false, true);
  text("uaeh.edu.mx", 176, 421, 8, false, true);
  doc.save("comprobante-inscripcion-423203.pdf");
}
