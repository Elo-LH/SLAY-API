var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Column, Table, ForeignKey, BelongsTo, DataType, Default, Unique, AllowNull, } from 'sequelize-typescript';
import { Geolocation } from './Geolocation.js';
const pronounsEnum = ['il', 'elle', 'iel'];
const rolesEnum = ['artist', 'band', 'slayer'];
let Slayer = class Slayer extends Model {
    email;
    pseudo;
    password;
    isAdmin;
    avatar;
    role;
    pronouns;
    isSearching;
    geolocationId;
    geolocation;
};
__decorate([
    Unique,
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], Slayer.prototype, "email", void 0);
__decorate([
    Unique,
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], Slayer.prototype, "pseudo", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], Slayer.prototype, "password", void 0);
__decorate([
    Default(false),
    Column,
    __metadata("design:type", Boolean)
], Slayer.prototype, "isAdmin", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], Slayer.prototype, "avatar", void 0);
__decorate([
    Default('USER'),
    Column(DataType.ENUM({ values: rolesEnum })),
    __metadata("design:type", String)
], Slayer.prototype, "role", void 0);
__decorate([
    Column(DataType.ENUM({ values: pronounsEnum })),
    __metadata("design:type", String)
], Slayer.prototype, "pronouns", void 0);
__decorate([
    Default(false),
    Column,
    __metadata("design:type", Boolean)
], Slayer.prototype, "isSearching", void 0);
__decorate([
    ForeignKey(() => Geolocation),
    Column,
    __metadata("design:type", Number)
], Slayer.prototype, "geolocationId", void 0);
__decorate([
    BelongsTo(() => Geolocation),
    __metadata("design:type", Geolocation
    // Sounds ?
    )
], Slayer.prototype, "geolocation", void 0);
Slayer = __decorate([
    Table({
        timestamps: false,
        underscored: true,
        indexes: [
            {
                // Column name with underscores here
                fields: ['is_admin', 'is_searching', 'geolocation_id'],
            },
        ],
    })
], Slayer);
export { Slayer };
