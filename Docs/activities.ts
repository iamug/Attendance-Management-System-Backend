/**
 * @swagger
 * tags:
 *   name: activities
 *   description: Activities api documentation
 *
 *
 */

// Endpoint section

/**
 * @swagger
 * path:
 * /activities:
 *      get:
 *          summary: fetch all clockins and clockouts for authenticated user
 *          tags: [activities]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/activitiesresponse"
 *
 *
 *
 * /activities/filter:
 *      post:
 *          summary: filter authenticated user activities by startDate and endDate
 *          tags: [activities]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/filterrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/activitiesresponse"
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
 *      activitiesresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: boolean
 *                          description: success or error
 *                      data:
 *                          type: object
 *                          description: array of clockin and clockout objects
 *
 *      filterrequest:
 *          type: object
 *          required:
 *              - startDate
 *          properties:
 *              startDate:
 *                  type: string
 *                  format: date-time
 *                  required: true
 *                  description: date used as the beginning of filtering user activities
 *              endDate:
 *                  type: string
 *                  format: date-time
 *                  required: false
 *                  description: date used as the end of filtering user activities
 *
 *
 */
