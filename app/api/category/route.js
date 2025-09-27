// app/api/category/route.js
import { NextResponse } from 'next/server';
import Category from '@/models/Category';
import { connectDB } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  await connectDB();
  try {
    const items = await Category.find({}).lean();
    const mapped = items.map(c => ({ ...c, id: c._id?.toString?.() ?? c.id }));
    return NextResponse.json(mapped);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const doc = await Category.create(body);
    const created = await Category.findById(doc._id).lean();
    return NextResponse.json(
      { ...created, id: created._id?.toString?.() ?? created.id },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
