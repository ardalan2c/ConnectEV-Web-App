import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get("owner") || "";
  const unit = url.searchParams.get("unit") || "";
  const spot = url.searchParams.get("spot") || "";
  const building = url.searchParams.get("building") || "";
  const charger = url.searchParams.get("charger") || "";
  const lec = url.searchParams.get("lec") || "";

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // Letter
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const title = "Condo EV Charging Request";
  let y = 740;
  page.drawText(title, { x: 72, y, size: 18, font, color: rgb(0, 0, 0) });
  y -= 28;
  const lines = [
    `Owner: ${owner}`,
    `Unit: ${unit}`,
    `Parking spot: ${spot}`,
    `Building: ${building}`,
    `Charger model: ${charger}`,
    `LEC license: ${lec}`,
    "",
    "Note: ESA permit will be filed before work begins.",
  ];
  for (const l of lines) {
    page.drawText(l, { x: 72, y, size: 12, font, color: rgb(0.1, 0.1, 0.1) });
    y -= 18;
  }
  const bytes = await pdf.save();
  return new NextResponse(Buffer.from(bytes), { headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=condo-letter.pdf" } });
}
