import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth, adminGuardResponse } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return adminGuardResponse();
  }

  try {
    const leads = await prisma.lead.findMany({
      take: 500,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        addressJson: true,
        runLengthMeters: true,
        chargerType: true,
        extrasJson: true,
        priceBandMin: true,
        priceBandMax: true,
        status: true,
        source: true,
        caslConsent: true,
        createdAt: true,
      },
    });

    const csvHeaders = [
      "ID",
      "First Name",
      "Last Name", 
      "Email",
      "Phone",
      "Address",
      "Run Length (m)",
      "Charger Type",
      "Extras",
      "Price Min",
      "Price Max",
      "Status",
      "Source",
      "CASL Consent",
      "Created At",
    ];

    const csvRows = leads.map((lead) => [
      lead.id,
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phone,
      typeof lead.addressJson === "object" && lead.addressJson 
        ? (lead.addressJson as any).formatted || ""
        : "",
      lead.runLengthMeters,
      lead.chargerType,
      typeof lead.extrasJson === "object" && lead.extrasJson
        ? JSON.stringify(lead.extrasJson)
        : "",
      lead.priceBandMin,
      lead.priceBandMax,
      lead.status,
      lead.source,
      lead.caslConsent,
      lead.createdAt.toISOString(),
    ]);

    const csv = [csvHeaders, ...csvRows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=leads-export.csv",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}