import { createFileRoute } from "@tanstack/react-router";

import logoAsset from "@/assets/uaeh-logo.png.asset.json";
import fotoAsset from "@/assets/foto-axel.jpg.asset.json";

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
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="bg-uaeh-dark px-4 py-3">
        <div className="mx-auto flex max-w-[1364px] items-center gap-6">
          <img src={logoAsset.url} alt="Universidad Autónoma del Estado de Hidalgo" className="h-28 w-auto" />
          <div className="flex-1 text-center text-primary-foreground">
            <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
              UNIVERSIDAD AUTÓNOMA DEL ESTADO DE HIDALGO
            </h1>
            <p className="mt-1 text-base font-bold sm:text-xl">SECRETARÍA GENERAL</p>
            <p className="text-sm font-bold sm:text-lg">Dirección de Administración Escolar</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-4 py-8 text-center">
        <p className="text-xs text-foreground">Comprobante de inscripción</p>
        <h2 className="mt-4 text-lg font-bold tracking-wide text-foreground">JULIO-DICIEMBRE 2026</h2>

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
              <a
                href="/comprobante.pdf"
                download="comprobante.pdf"
                aria-label="Descargar comprobante en PDF"
                className="cursor-pointer"
              >
                <img src={fotoAsset.url} alt="Fotografía del alumno" className="h-[113px] w-[89px] object-cover" />
              </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs">
          <span className="text-muted-foreground">Estatus</span>
          <span className="font-bold text-status-ok">Inscrito</span>
        </div>

        <table className="mx-auto mt-5 w-[224px] border-collapse text-[7.5px] text-uaeh-dark">
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

        <p className="mt-4 text-[8px] font-bold text-foreground">Carga académica</p>

        <table className="mx-auto mt-1 w-[280px] border-collapse text-[6.5px] text-uaeh-dark">
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

        <p className="mt-6 text-[8px] font-bold text-foreground">
          uaeh<span className="text-uaeh-red">.edu.mx</span>
        </p>

      </main>
    </div>
  );
}
