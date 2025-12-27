import servicesData from "@/data/services.json";
import { collections, dbConnect } from "@/lib/dbConnect";

function assertDbConfigured() {
  if (!process.env.MONGODB_URI || !process.env.DBNAME) {
    throw new Error("Database is not configured. Set MONGODB_URI and DBNAME in environment.");
  }
}

function slugify(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const seedServicesIfEmpty = async () => {
  assertDbConfigured();
  const count = await dbConnect(collections.SERVICES).countDocuments();
  if (count === 0) {
    await dbConnect(collections.SERVICES).insertMany(
      servicesData.map((s) => ({
        ...s,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  }
};

export const getServices = async () => {
  assertDbConfigured();
  await seedServicesIfEmpty();
  const rows = await dbConnect(collections.SERVICES)
    .find({})
    .toArray();

  const col = dbConnect(collections.SERVICES);
  const result = [];
  const seen = new Set();
  for (const r of rows) {
    let id = r.id;
    if (!id) {
      id = slugify(r.name || r._id?.toString());
      await col.updateOne({ _id: r._id }, { $set: { id } });
      r.id = id;
    }
    if (seen.has(id)) continue;
    seen.add(id);
    const { _id, ...rest } = r;
    result.push(rest);
  }
  return result;
};

export const getServiceById = async (id) => {
  assertDbConfigured();
  await seedServicesIfEmpty();
  return await dbConnect(collections.SERVICES).findOne(
    { id },
    { projection: { _id: 0 } }
  );
};
