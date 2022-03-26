import { formatPrice } from "utils/formatters";

describe('formatPrice for positive numbers', () => {
    it('formatPrice should format number pt-BR', () => {

        const value = 10.01

        const result = formatPrice(value);

        expect(result).toEqual("10,01")
    })
})