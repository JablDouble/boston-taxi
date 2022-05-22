import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TableComponent } from './components/table/table.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataRecordComponent } from './components/data-record/data-record.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { LoaderService } from "./services/loader.service";
import { LoaderInterceptor } from "./interceptors/loader-interceptors.service";
import { AuthService } from "../auth/shared/services/auth.service";
import { ProfileService } from "./services/profile.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TableComponent,
        AddressInputComponent,
        DataRecordComponent,
        ButtonComponent,
        InputComponent,
    ],
    providers: [
        LoaderService,
        LoaderInterceptor,
        AuthService,
        ProfileService
    ],
    exports: [
        HttpClientModule,
        TableComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AddressInputComponent,
        DataRecordComponent,
        ButtonComponent,
        InputComponent,
    ]
})
export class SharedModule {

}