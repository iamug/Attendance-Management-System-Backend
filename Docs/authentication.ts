/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication api documentation
 *
 *
 */

// Endpoint section

/**
 * @swagger
 * path:
 * /login:
 *      post:
 *          summary: logs user in to the Dashboard
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/loginrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/loginresponse"
 *
 *
 *
 * /register:
 *      post:
 *          summary: sign's user up 
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/registerrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/registerresponse"
 *
 * /reset-password:
 *      post:
 *          summary: Allow user reset password
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/password-resetrequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/password-resetresponse"
 * /update-password:
 *      post:
 *          summary: Allow user  update password
 *          tags: [Authentication]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : "#/components/schemas/password-updaterequest"
 *          responses:
 *              "200":
 *                  Content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/password-resetresponse"
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
 *      loginresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          description: success or error
 *                      token:
 *                          type: string
 *                          description: generated token for the particular user
 *                      user:
 *                          type: object
 *                          description: an object of users details
 *
 *      loginrequest:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: email user signs up with 
 *              password:
 *                  type: string
 *                  required: true
 *                  description: current user's password
 * 
 *      registerresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          description: success or error
 *                      token:
 *                          type: string
 *                          description: generated token for the particular user
 *                      user:
 *                          type: object
 *                          description: an object of users details
 *
 *      registerrequest:
 *          type: object
 *          required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *          properties:
 *              firstname:
 *                  type: string
 *                  required: true
 *                  description: accepts user's firstname
 *              lastname:
 *                  type: string
 *                  required: true
 *                  description: accepts user's lastname
 *              email:
 *                  type: string
 *                  required: true
 *                  description: email user signs up with 
 *              password:
 *                  type: string
 *                  required: true
 *                  description: current user's password
 * 
 *      password-resetresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: boolean
 *                          description: true or false, describing if there there was an error in the request
 *                      message:
 *                          type: string
 *                          description: if request is successful, sends a password reset link to email
 *
 *      password-resetrequest:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: accepts user's email
 * 
 *      password-updateresponse:
 *          type: object
 *          properties:
 *              payload:
 *                  type: object
 *                  properties:
 *                      error:
 *                          type: boolean
 *                          description: true or false, describing if there there was an error in the request
 *                      message:
 *                          type: string
 *                          description: if request is successful,update user's password
 *
 *      password-updaterequest:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - confirmPassword
 *          properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: accepts user's email
 *              password:
 *                  type: string
 *                  required: true
 *                  description: accepts user's new password
 *              confirmPassword:
 *                  type: string
 *                  required: false
 *                  description: accepts password, allow user retype password
 *
 *
 */
