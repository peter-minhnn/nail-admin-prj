import { z } from 'zod'

// Product Schema
const productSchema = z.object({
  id: z.number().int().optional(),
  productNameVi: z
    .string()
    .min(1, { message: 'products.errors.productNameViRequired' }),
  productNameEn: z.string().optional().default(''),
  descriptionVi: z
    .string()
    .min(1, { message: 'products.errors.descriptionViRequired' })
    .max(1000, { message: 'products.errors.descriptionViMaxLength' }),
  descriptionEn: z
    .string()
    .max(1000, { message: 'products.errors.descriptionEnMaxLength' })
    .optional()
    .default(''),
  contentVi: z
    .string()
    .min(1, { message: 'products.errors.contentViRequired' }),
  contentEn: z.string().optional().default(''),
  price: z.number().optional(),
  thumbnail: z.any().optional(),
  productType: z.number().optional(),
  sortOrder: z.number().optional(),
})

const productListSchema = z.array(productSchema)
type ProductData = z.infer<typeof productSchema>

// Product Type Schema
const productTypeSchema = z.object({
  id: z.number().int().optional(),
  nameVi: z.string().min(1, { message: 'products.errors.nameViRequired' }),
  nameEn: z.string().optional().default(''),
  descVi: z
    .string()
    .min(1, { message: 'products.errors.descriptionViRequired' })
    .max(1000, { message: 'products.errors.descriptionViMaxLength' }),
  descEn: z.string().optional().default(''),
})
const productTypeListSchema = z.array(productTypeSchema)
type ProductTypeData = z.infer<typeof productTypeSchema>

//Export
export type { ProductData, ProductTypeData }
export {
  productSchema,
  productListSchema,
  productTypeListSchema,
  productTypeSchema,
}
