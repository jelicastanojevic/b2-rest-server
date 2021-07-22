import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { Employee } from '../../models/Employee';

export const EmployeeDb = {
  getEmployees() {
    return Database.executeQuery(
      'SELECT id, \
              ime as "name", \
              prezime as "surname",  \
              adresa as "address", \
              email, \
              telefon as "telephoneNumber", \
              jmbg, \
              tip_zaposlenog as "typeOfEmployee" \
       FROM zaposleni'
    );
  },
  async getEmployee(id: number) {
    const employee = await Database.executeQuery(
      'SELECT id, \
              ime as "name", \
              prezime as "surname",  \
              adresa as "address", \
              email, \
              telefon as "telephoneNumber", \
              jmbg, \
              tip_zaposlenog as "typeOfEmployee" \
       FROM zaposleni WHERE id = $1',
      [id]
    );

    if (!employee) {
      throw new HttpError(404, 'Employee not found!');
    }

    return employee;
  },
  insertEmployee(employee: Employee) {
    return Database.executeQuery(
      'INSERT INTO zaposleni(id, ime, prezime, adresa, email, telefon, jmbg, tip_zaposlenog) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        employee.getId(),
        employee.getName(),
        employee.getSurname(),
        employee.getAddress(),
        employee.getEmail(),
        employee.getTelephoneNumber(),
        employee.getJmbg(),
        employee.getTypeOfEmployee(),
      ]
    );
  },
  async updateEmployee(employee: Employee) {
    const result = await Database.executeQuery(
      'UPDATE zaposleni SET ime = $1, prezime = $2, adresa = $3, email = $4, telefon = $5, jmbg = $6, tip_zaposlenog = $7 WHERE id = $8',
      [
        employee.getName(),
        employee.getSurname(),
        employee.getAddress(),
        employee.getEmail(),
        employee.getTelephoneNumber(),
        employee.getJmbg(),
        employee.getTypeOfEmployee(),
        employee.getId(),
      ]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Employee not found!');
    }
  },
  async deleteEmployee(id: number) {
    const result = await Database.executeQuery('DELETE FROM zaposleni WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      throw new HttpError(404, 'Employee not found!');
    }
  },
};
