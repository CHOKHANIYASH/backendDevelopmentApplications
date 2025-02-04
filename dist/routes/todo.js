"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("../models/todo");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.ToDo.find({});
        res.send(todos);
    }
    catch (error) {
        res.status(500).send("Error fetching todos");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todo = yield todo_1.ToDo.findById(id);
        if (!todo) {
            res.send("ToDo not found");
        }
        else {
            res.send(todo);
        }
    }
    catch (error) {
        res.status(500).send("Error fetching ToDo");
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, description, completed } = req.body;
        const newToDo = new todo_1.ToDo({
            task,
            description,
            completed,
        });
        yield newToDo.save();
        res.send("ToDo Created");
    }
    catch (error) {
        res.status(500).send("Error creating ToDo");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, description, completed } = req.body;
        const id = req.params.id;
        const updatedToDo = yield todo_1.ToDo.findByIdAndUpdate(id, {
            task,
            description,
            completed,
        });
        res.send("Updated the Todo");
    }
    catch (error) {
        res.status(500).send("Error updating ToDo");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield todo_1.ToDo.findByIdAndDelete(id);
        res.send("ToDo Deleted");
    }
    catch (error) {
        res.status(500).send("Error deleting ToDo");
    }
}));
exports.default = router;
//# sourceMappingURL=todo.js.map