import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import fotoAsset from "@/assets/foto-axel.jpg.asset.json";
import { generarComprobantePdf } from "@/lib/comprobante-pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comprobante de inscripción | UAEH — Administración Escolar" },
      {
        name: "description",
        content:
          "Comprobante de inscripción Julio-Diciembre 2026, Universidad Autónoma del Estado de Hidalgo, Dirección de Administración Escolar.",
      },
      { property: "og:title", content: "Comprobante de inscripción | UAEH" },
      {
        property: "og:description",
        content: "Comprobante de inscripción Julio-Diciembre 2026 — Carga académica del alumno.",
      },
    ],
  }),
  component: Comprobante,
});

const carga = [
  { asignatura: "OPTATIVA V (DIDÁCTICA ESPECÍFICA)", semestre: "7", grupo: "1" },
  { asignatura: "PRÁCTICA PROFESIONAL", semestre: "7", grupo: "1" },
  { asignatura: "OPTATIVA VI (TENDENCIAS PEDAGÓGICAS CONTEMPORÁNEAS)", semestre: "8", grupo: "1" },
];

function Comprobante() {
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const descargar = async () => {
    setGenerando(true);
    setError(null);
    try {
      await generarComprobantePdf(window.location.href);
    } catch {
      setError(
        "No se pudo generar el PDF. Comprueba que la fotografía esté disponible e inténtalo de nuevo.",
      );
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="enrollment-page min-h-screen bg-background font-sans">
      <header className="school-header">
        <img
          src="/uaeh-escolar.png"
          width="231"
          height="68"
          alt="UAEH · Dirección de Administración Escolar"
        />
      </header>

      <main className="enrollment-main">
        <p className="text-xs text-foreground">Comprobante de inscripción</p>
        <h2 className="mt-4 text-lg font-bold tracking-wide text-foreground">
          JULIO-DICIEMBRE 2026
        </h2>

        <div className="mx-auto mt-4 flex w-[224px] justify-center">
          <div className="flex w-full">
            <div className="flex w-[135px] flex-col justify-between bg-uaeh-red text-left">
              <div className="flex items-center bg-uaeh-dark">
                <span className="px-2 py-1 text-[7px] font-semibold text-primary-foreground">
                  Número de cuenta
                </span>
                <span className="bg-uaeh-red px-2 py-1 text-[11px] font-bold text-primary-foreground">
                  423203
                </span>
              </div>
              <div className="px-2 pb-3 text-[7px] font-bold leading-relaxed text-primary-foreground">
                <p>VARGAS BAUTISTA</p>
                <p>AXEL GABRIEL</p>
              </div>
            </div>
            <button
              type="button"
              onClick={descargar}
              disabled={generando}
              aria-label="Descargar comprobante en PDF"
              className="cursor-pointer"
            >
              <img
                src={fotoAsset.url}
                alt="Fotografía del alumno"
                className="h-[113px] w-[89px] object-cover"
              />
            </button>
          </div>
        </div>

        <div className="enrollment-status">
          <span>Estatus</span>
          <span className="status-enrolled">Inscrito</span>
        </div>

        <table aria-label="Datos académicos" className="academic-table institution-table">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "21%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td colSpan={4} className="border border-table-line px-1 py-1 text-center">
                Instituto de Ciencias Sociales y Humanidades
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="border border-table-line px-1 py-1 text-center font-bold">
                Licenciatura en Ciencias de la Educación (2014)
              </td>
            </tr>
            <tr>
              <td className="border border-table-line px-1 py-1">Semestre</td>
              <td className="border border-table-line px-1 py-1 font-bold">7</td>
              <td className="border border-table-line px-1 py-1">Grupo</td>
              <td className="border border-table-line px-1 py-1 font-bold">1</td>
            </tr>
            <tr>
              <td className="border border-table-line px-1 py-1">Promedio</td>
              <td className="border border-table-line px-1 py-1 font-bold">9.00</td>
              <td className="border border-table-line px-1 py-1">Reprobadas</td>
              <td className="border border-table-line px-1 py-1 font-bold">0</td>
            </tr>
          </tbody>
        </table>

        <p className="course-title">Carga académica</p>

        <table aria-label="Carga académica" className="academic-table course-table">
          <colgroup>
            <col style={{ width: "67%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "16%" }} />
          </colgroup>
          <thead>
            <tr>
              <th className="border border-table-line px-1 py-1 font-normal">Asignatura</th>
              <th className="border border-table-line px-1 py-1 font-normal">Semestre</th>
              <th className="border border-table-line px-1 py-1 font-normal">Grupo</th>
            </tr>
          </thead>
          <tbody>
            {carga.map((m) => (
              <tr key={m.asignatura}>
                <td className="border border-table-line px-1 py-1">{m.asignatura}</td>
                <td className="border border-table-line px-1 py-1 text-center">{m.semestre}</td>
                <td className="border border-table-line px-1 py-1 text-center">{m.grupo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && (
          <p role="alert" className="download-error">
            {error}
          </p>
        )}

        <p className="school-footer">
          uaeh<span className="text-uaeh-red">.edu.mx</span>
        </p>
      </main>
    </div>
  );
}
