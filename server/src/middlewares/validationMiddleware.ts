const validationMiddleware = (schema: any) => {
    return (req: any, res: any, next: any) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorDetails = error.details.map(
                (detail: any) => detail.message
            );
            return res.status(400).json({ errors: errorDetails });
        }

        next();
    };
};

export default validationMiddleware;
