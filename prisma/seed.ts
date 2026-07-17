import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Mulai memasukkan data produk tiruan (dummy)...')

  // Buat kategori dulu
  const cat1 = await prisma.category.upsert({
    where: { slug: 'hospital-furniture' },
    update: {},
    create: {
      name: 'Hospital Furniture',
      slug: 'hospital-furniture',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=300&q=80'
    },
  })

  const cat2 = await prisma.category.upsert({
    where: { slug: 'patient-monitor' },
    update: {},
    create: {
      name: 'Patient Monitor',
      slug: 'patient-monitor',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80'
    },
  })

  // Masukkan Produk
  const products = [
    {
      name: 'Ranjang Pasien Elektrik 3 Crank',
      brand: 'Sella',
      categoryId: cat1.id,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
      description: 'Ranjang pasien elektrik dengan 3 fungsi pengaturan.',
      isFeatured: true
    },
    {
      name: 'Patient Monitor 12 Inch 6 Parameter',
      brand: 'Mindray',
      categoryId: cat2.id,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
      description: 'Monitor pasien canggih untuk ICU dan ruang operasi.',
      isFeatured: true
    },
    {
      name: 'Meja Periksa Pasien Standar',
      brand: 'Lokal',
      categoryId: cat1.id,
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=400&q=80',
      description: 'Meja periksa pasien bahan stainless steel kuat.',
      isFeatured: false
    }
  ]

  for (const p of products) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('Berhasil memasukkan 3 produk baru ke database!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
