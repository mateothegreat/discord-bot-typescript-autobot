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
const typeorm_1 = require("typeorm");
let ChatMessage = class ChatMessage {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatMessage.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatMessage.prototype, "userid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatMessage.prototype, "discriminator", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatMessage.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 1000 }),
    __metadata("design:type", String)
], ChatMessage.prototype, "content", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ChatMessage.prototype, "createdDate", void 0);
ChatMessage = __decorate([
    typeorm_1.Entity()
], ChatMessage);
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map