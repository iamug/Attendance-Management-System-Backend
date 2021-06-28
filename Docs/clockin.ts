/**
 * @swagger
 * tags:
 *   name: clockin
 *   description: Clockin api documentation
 *
 *
 */

// Endpoint section

/**
 * @swagger
 * path:
 * /clockin:
 *      post:
 *          summary: clockin authenticated user from the dashboard
 *          tags: [clockin]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/clockinrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockinresponse"
 *
 * /clockin/check:
 *      get:
 *          summary: check if user has clocked in for current day
 *          tags: [clockin]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockinresponse"
 *
 *
 * /clockin/homepage:
 *      post:
 *          summary: clockin user from homepage
 *          tags: [clockin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/clockinrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/clockinresponse"
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
 *      clockinresponse:
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
 *      clockinrequest:
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
