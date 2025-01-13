"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slayer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Geolocation_js_1 = require("./Geolocation.js");
const pronounsEnum = ['il', 'elle', 'iel'];
const rolesEnum = ['artist', 'band', 'slayer'];
let Slayer = class Slayer extends sequelize_typescript_1.Model {
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
exports.Slayer = Slayer;
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Slayer.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Slayer.prototype, "pseudo", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Slayer.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Slayer.prototype, "isAdmin", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Slayer.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('USER'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM({ values: rolesEnum })),
    __metadata("design:type", String)
], Slayer.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM({ values: pronounsEnum })),
    __metadata("design:type", String)
], Slayer.prototype, "pronouns", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Slayer.prototype, "isSearching", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Geolocation_js_1.Geolocation),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Slayer.prototype, "geolocationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Geolocation_js_1.Geolocation),
    __metadata("design:type", Geolocation_js_1.Geolocation
    // Sounds ?
    )
], Slayer.prototype, "geolocation", void 0);
exports.Slayer = Slayer = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        geolocation: {
            include: [
                {
                    model: Geolocation_js_1.Geolocation,
                    through: { attributes: [] },
                },
            ],
        },
        full: {
            include: [
                {
                    model: Geolocation_js_1.Geolocation,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        underscored: true,
        tableName: 'slayer',
        indexes: [
            {
                // Column name with underscores here
                fields: ['is_admin', 'is_searching', 'geolocation_id'],
            },
        ],
    })
], Slayer);
