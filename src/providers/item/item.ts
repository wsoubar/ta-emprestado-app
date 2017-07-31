import { Item } from './../../shared/model/item';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ItemProvider {

    constructor(public http: Http, private db: AngularFireDatabase) {
        console.log('Hello ItemProvider Provider');
    }

    listItems(): Observable <Item []> {
        return this.db.list('items')
            //.do(console.log)
            .map(Item.fromJsonList);
    }

    addItem(item: any) {
        return Observable.create(observer => {
            this.db.list('items').push(item)
                .then(data => {
                    observer.next(data);
                }).catch(error => {
                    observer.error(error);
                });
        });
    }

    removeItem(item: any) {
        return Observable.create(observer => {
            this.db.list('items').remove(item.$key)
                .then(data => {
                    observer.next(data);
                }).catch(error => {
                    observer.next(error);
                });
        });
    }



}



/*

import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from 'angularfire2';
import {Http} from "@angular/http";
import {firebaseConfig} from "../../../environments/firebase.config";


@Injectable()
export class LessonsService {

    sdkDb:any;

    constructor(private db:AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
                private http:Http) {

        this.sdkDb = fb.database();

    }


    findAllLessons():Observable<Lesson[]> {

        return this.db.list('lessons')
            .do(console.log)
            .map(Lesson.fromJsonList);

    }

    findLessonByUrl(url:string):Observable<Lesson> {
        return this.db.list('lessons', {
            query: {
                orderByChild: 'url',
                equalTo: url
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => Lesson.fromJson(results[0]))
        .do(console.log);
    }


    loadNextLesson(courseId:string, lessonId:string):Observable<Lesson> {
        return this.db.list(`lessonsPerCourse/${courseId}`, {
            query: {
                orderByKey:true,
                startAt: lessonId,
                limitToFirst: 2
            }
        })
        .filter(results => results && results.length > 0) 
        .map(results => results[1].$key)
        .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
        .map(Lesson.fromJson);
    }


    loadPreviousLesson(courseId:string, lessonId:string):Observable<Lesson> {
        return this.db.list(`lessonsPerCourse/${courseId}`, {
            query: {
                orderByKey:true,
                endAt: lessonId,
                limitToLast: 2
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => results[0].$key)
        .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
        .map(Lesson.fromJson);

    }

    createNewLesson(courseId:string, lesson:any): Observable<any> {

        const lessonToSave = Object.assign({}, lesson, {courseId});

        const newLessonKey = this.sdkDb.child('lessons').push().key;

        let dataToSave = {};

        dataToSave["lessons/" + newLessonKey] = lessonToSave;
        dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;


        return this.firebaseUpdate(dataToSave);
    }

    firebaseUpdate(dataToSave) {
        const subject = new Subject();

        this.sdkDb.update(dataToSave)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
            );

        return subject.asObservable();
    }


    saveLesson(lessonId:string, lesson): Observable<any> {

        const lessonToSave = Object.assign({}, lesson);
        delete(lessonToSave.$key);

        let dataToSave = {};
        dataToSave[`lessons/${lessonId}`] = lessonToSave;

        return this.firebaseUpdate(dataToSave);


    }


    deleteLesson(lessonId:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/lessons/' + lessonId + '.json';

        return this.http.delete(url);
    }


    requestLessonDeletion(lessonId:string, courseId:string) {
        this.sdkDb.child('queue/tasks').push({lessonId,courseId})
            .then(
                () => alert('lesson deletion requested !')
            );
    }



}

*/