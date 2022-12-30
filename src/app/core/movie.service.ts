import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  MovieDetailsModel,
  MovieCategoryModel,
  MoviePersonModel,
  MovieCreditsModel,
  TvCreditsModel,
  MovieVideosModel,
} from '../shared/models/movie';

const local = 'http://localhost:8080';

const endpoint = {
  findMovie: `${local}/findMovie`,
  similarMovie: `${local}/similarMovie`,
};

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  // getMovie(category: string, page: number, lang: string) {
  //   switch (category) {
  //     case 'now-playing':
  //       return this.getNowPlaying(page, lang);
  //     case 'upcoming':
  //       return this.getUpComing(page, lang);
  //     case 'discover':
  //       return this.getMovieDiscover(page, lang);
  //   }
  // }
  getCastMovie(movieID: number): Observable<MovieCreditsModel> {
    return this.http.get<MovieCreditsModel>('');
  }
  getDetailsMovie(movieID: number, lang: string): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>('');
  }
  getGenreMovie(genreID: number, page: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>('');
  }
  getSearchMovie(name: string, page: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>('');
  }
  getNowPlaying(page: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>('');
  }

  getMovieDiscover(page: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>('');
  }
  getVideoMovie(movieID: number, lang: string): Observable<MovieVideosModel> {
    return this.http.get<MovieVideosModel>('');
  }

  getSimilarMovies(movieID: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.post<MovieCategoryModel>(endpoint.similarMovie, { movieID, lang });
  }
  getUpComing(page: number, lang: string): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>('');
  }
  getPerson(personID: number, lang: string): Observable<MoviePersonModel> {
    return this.http.get<MoviePersonModel>('');
  }
  getPersonMovies(personID: number, lang: string): Observable<MovieCreditsModel> {
    return this.http.get<MovieCreditsModel>('');
  }
  getPersonTv(personID: number, lang: string): Observable<TvCreditsModel> {
    return this.http.get<TvCreditsModel>('');
  }
  getPager(totalPages: number, currentPage: number = 1) {
    let startPage = 0;
    let endPage = 0;
    if (totalPages >= 1000) {
      totalPages = 1000;
    }
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else if (currentPage >= 1000) {
        startPage = currentPage - 5;
        currentPage = 1000;
        totalPages = 1000;
        endPage = 1000;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = new Array(startPage, currentPage, endPage);

    // return object with all pager properties required by the view
    return {
      currentPage,
      totalPages,
      startPage,
      endPage,
      pages,
    };
  }
}
