// app/api/product/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/Product';

import { connectDB } from '@/lib/db'; 

const isBadId = (id) => !id || !mongoose.Types.ObjectId.isValid(id);

export async function GET(_req, { params }) {
  const { id } = params; // folder is [id] → params.id
  if (isBadId(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }
  try {
    // await connectDB();
    const product = await Product.findById(id).populate('category').lean();
    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...product,
      id: product._id?.toString?.() ?? product.id,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  if (isBadId(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }
  try {
    // await connectDB();
    const deleted = await Product.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  if (isBadId(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }
  try {
    const body = await req.json();
    // await connectDB();
    const updated = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...updated,
      id: updated._id?.toString?.() ?? updated.id,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
