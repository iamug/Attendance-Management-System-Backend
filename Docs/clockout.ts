/**
 * @swagger
 * tags:
 *   name: clockout
 *   description: Clockout api documentation
 *
 *
 */

// Endpoint section

/**
 * @swagger
 * path:
 * /clockout:
 *      post:
 *          summary: clockout authenticated user from the dashboard
 *          tags: [clockout]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/clockoutrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockoutresponse"
 *
 * /clockout/check:
 *      get:
 *          summary: check if user has clocked out for current day
 *          tags: [clockout]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockoutresponse"
 *
 *
 * /clockout/homepage:
 *      post:
 *          summary: clockout authenticated user from homepage
 *          tags: [clockout]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/clockoutrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockoutresponse"
 *
 *
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
