import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    // Acting and assert on the same line.
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    const pipe = new StrengthPipe();

    // Acting and assert on the same line.
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should display unbelievable if strength is 22', () => {
    const pipe = new StrengthPipe();

    // Acting and assert on the same line.
    expect(pipe.transform(22)).toEqual('22 (unbelievable)');
  });
});
