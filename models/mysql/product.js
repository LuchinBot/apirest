import { connection } from '../../database.js'
import { hash } from '../../middlewares/crypto.js'

export class productModel {
  static async getAll() {
    const [products] = await connection.query('SELECT * FROM products;')
    return products
  }

  static async getById({ id }) {
    const [products] = await connection.query(
      'SELECT * FROM products p INNER JOIN categories c ON p.idcategories = c.id WHERE id = ?;',
      [id]
    )
    if (products.length === 0) return null
    return products[0]
  }

  static async create({ input }) {
    const { title, slug, description, price, stock, image } = input
    const sql = `
    INSERT INTO products
    (id, idcategories,title,slug, description,price,stock, image, create_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());`

    try {
      const [result] = await connection.query(sql, [
        hash,
        title,
        slug,
        description,
        price,
        stock,
        image
      ])

      console.log('Create result:', result)
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      'DELETE FROM products WHERE id = ?;',
      [id]
    )
    console.log(result)
  }

  static async update({ id, input }) {
    const sql = `
    UPDATE products 
    SET 
      idcategories = ?,
      title = ?,
      slug = ?,
      description = ?,
      price = ?,
      stock = ?,
      image = ?,
      update_at = NOW() 
    WHERE id = ?;
  `
    try {
      const [result] = await connection.query(sql, [
        input.idcategories,
        input.title,
        input.slug,
        input.description,
        input.price,
        input.stock,
        input.image,
        id
      ])
      console.log('Update result:', result)
    } catch (error) {
      console.error('Error updating product:', error)
      throw new Error('Failed to update product')
    }
  }
}
