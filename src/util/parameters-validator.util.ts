import { HttpException, HttpStatus } from "@nestjs/common";

export class ParametersValidator {
    static validate(parameters: Object, mandatoryFields? : Object) {
        let errorParams: string[] = [];
  
        Object.keys(parameters).forEach(param => {
            if(!parameters[param])
                errorParams.push(`O Parâmetro '${param}' é obrigatório`)
        })
 
        if (mandatoryFields) {
            Object.keys(mandatoryFields).forEach(param => {
                if(!mandatoryFields[param])
                      errorParams.push(`O Parâmetro '${param}' é obrigatório`)
            })
        }
  
        if (errorParams.length > 0)
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, errors: errorParams }, HttpStatus.BAD_REQUEST);
    }
}
