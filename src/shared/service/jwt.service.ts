import * as jwt from 'jsonwebtoken';

class JwtService {
    constructor(
        private readonly secret: string | undefined = process.env.JWT_SECRET
    ) {}

    async generateToken(
        payload: { id: string },
        expiresIn: string
    ): Promise<string> {
        if (!this.secret) {
            throw new Error('Secret is not defined');
        }
        return jwt.sign(payload, this.secret, { expiresIn: expiresIn });
    }

    async verify(token: string): Promise<object> {
        try {
            if (!process.env.JWT_SECRET) throw new Error('Secret is not defined');
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return {
                valid: true,
                decoded: decoded,
            };
        } catch (error: any) {
            return {
                valid: false,
                error: error.message,
            };
        }
    }
}

const jwtService = new JwtService();
export default jwtService;