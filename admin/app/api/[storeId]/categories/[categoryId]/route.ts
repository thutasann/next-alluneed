import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('CATEGORY_GET ERROR', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string; caetegoryId: string } }) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, billboardId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is Required', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is Required', { status: 400 })
    }

    if (!params.caetegoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse(`Unauthorized`, {
        status: 401,
      })
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.caetegoryId,
      },
      data: {
        name,
        billboardId,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('CATEGORY_PATCH ERROR', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse(`Unauthorized`, {
        status: 401,
      })
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('CATEGORY_DELETE ERROR', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}
