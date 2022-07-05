import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { environment } from 'src/environments/environment';

describe('intercept HTTP requests', () => {
  let injector: TestBed;
  let service: TripDataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TripDataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    injector = getTestBed();
    service = injector.get(TripDataService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should add auth to headers', () => {
    service.getAllTrips().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpReq = httpMock.expectOne(`${environment.FIREBASE_API_URL}/trips.json`);
    expect(httpReq.request.headers.has('auth')).toEqual(true);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
