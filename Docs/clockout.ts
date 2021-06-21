/**
 * @swagger
 * tags:
 *  name: Clockout
 *  description: Clockout api documentation
 *
 */

// Endpoint section

/**
 * @swagger
 * path:
 * /clockout:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: clockout authenticated user from the dashboard
 *      tags: [Clockout]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref : "#/components/schemas/clockoutrequest"
 *      responses:
 *          "200":
 *              Content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/clockoutresponse"
 *
 * /clockout/check:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: check if user has clocked out for current day
 *      tags: [Clockout]
 *        responses:
 *          "200":
 *              Content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/clockoutresponse"
 *
 */

// Schema Section

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 *  schemas:
 *      clockoutresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          description: success  or error
 *                      message:
 *                          type: string
 *                          description: response message
 *
 *      clockoutrequest:
 *          type: object
 *          required:
 *              - location
 *          properties:
 *              location:
 *                  type: object
 *                  description: lat and long is required in the location object
 *
 *
 */
