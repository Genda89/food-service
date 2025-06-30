import { sign } from 'jsonwebtoken';

export default class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }
  id: number;
  userId: string;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}
