import { hasAnyRoles } from '../auth';
import * as TokenModule from '../token';

describe('hasAnyRoles tests', () => {
    it('should return true when empty list', () => {
        const result = hasAnyRoles([]);

        expect(result).toBeTruthy();
    })

    it('should return true when user has given role', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: "",
            authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        })

        const result = hasAnyRoles(['ROLE_ADMIN']);



        expect(result).toBeTruthy();
    })

    it('should return false when user doest not have given role', () => {

        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: "",
            authorities: ['ROLE_ADMIN'],
        })

        const result = hasAnyRoles(['ROLE_OPERATOR']);



        expect(result).toBeFalsy();
    })
})