/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - password
 *         - id
 *       properties:
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         password: "dah"
 */
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Изменить пользователя
 *     tags: [users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID пользователя, которого нужно обновить
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: Пользователь успешно изменён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Произошла ошибка при добавлении записи
 */