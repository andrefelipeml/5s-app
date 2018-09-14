import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evaluate } from '../model/evaluate';
import { Answer } from '../model/answer';

@Injectable()
export class EvaluateServiceProvider {

  apiUrl = 'https://api-senai5s.herokuapp.com/evaluates';

  constructor(public http: HttpClient) {}  

    search(): Observable<Array<Evaluate>> {
         return this.http.get(this.apiUrl)
            .map((response: Response) => 
            {
                return response;
            })
            .catch(this.handleError);      
    }

   finishEvaluate(evaluateId: number, answers: Array<Answer>) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        return this.http.post(`${this.apiUrl}/${evaluateId}`, answers, httpOptions);
    }

   generateActionPlan() {
    return this.http.get(this.apiUrl)
       .map((response: Response) => 
       {
           return response;
       })
       .catch(this.handleError);      
}

    
    private handleError(error: Response) {
        console.log('error ',error);
        return Observable.throw(error || 'Server error');
    }
}