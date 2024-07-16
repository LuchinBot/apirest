import { connection } from '../../database.js'
import { generateHash } from '../../middlewares/crypto.js'

export class productModel {
  static async getAll() {
    const [products] = await connection.query('SELECT * FROM products;')
    return products
  }

  static async getById({ id }) {
    const [products] = await connection.query(
      'SELECT * FROM products p INNER JOIN categories c ON p.idcategories = c.id WHERE p.id = ?;',
      [id]
    )
    if (products.length === 0) return null
    return products[0]
  }

  static async create({ input }) {
    const { idcategories, title, slug, description, price, stock, image } =
      input
    const hash = await generateHash()
    const sql = `
    INSERT INTO products
    (id, idcategories,title,slug, description,price,stock, image, create_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());`

    try {
      const [result] = await connection.query(sql, [
        hash,
        idcategories,
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
    const { idcategories, title, slug, description, price, stock, image } =
      input
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
        idcategories,
        title,
        slug,
        description,
        price,
        stock,
        image,
        id
      ])
      console.log('Update result:', result)
    } catch (error) {
      console.error('Error updating product:', error)
      throw new Error('Failed to update product')
    }
  }
}
