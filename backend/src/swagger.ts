import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Music API',
            version: '1.0.0',
            description:
                'API documentation for the Music and Artist management system',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            example: 'john@example.com',
                        },
                        password: {
                            type: 'string',
                            example: 'hashedpassword123',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                    },
                },
                Music: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Song 1',
                        },
                        artistId: {
                            type: 'integer',
                            example: 1,
                        },
                        genderId: {
                            type: 'integer',
                            example: 1,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        artist: {
                            $ref: '#/components/schemas/Artist', // Reference the Artist schema
                        },
                        gender: {
                            $ref: '#/components/schemas/Gender', // Reference the Gender schema
                        },
                    },
                },
                Artist: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Artist 1',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                    },
                },
                Gender: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Gender 1',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                    },
                },
                Playlist: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'My Playlist',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-10-01T12:00:00Z',
                        },
                        musics: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Music',
                            },
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
