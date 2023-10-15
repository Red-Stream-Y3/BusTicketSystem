import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const { employeeId, employeeName, employeeRole, employeeDepot } = req.body;
  try {
    const employee = new Employee({
      employeeId,
      employeeName,
      employeeRole,
      employeeDepot,
    });
    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

export const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({}).populate(
      "employeeDepot",
      "depotName"
    );

    const employeesIdNameRoleDepotName = employees.map((employee) => {
      return {
        _id: employee._id,
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        employeeRole: employee.employeeRole,
        employeeDepot: employee.employeeDepot
          ? employee.employeeDepot.depotName
          : null,
      };
    });

    res.json(employeesIdNameRoleDepotName);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getEmployeesByRole = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({ employeeRole: req.params.role });
    res.json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getEmployeesByRoleAndDepot = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({
      employeeRole: req.params.role,
      employeeDepot: req.params.depot,
    });
    res.json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getEmployeesByDepot = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({ employeeDepot: req.params.depot });
    res.json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { employeeId, employeeName, employeeRole, employeeDepot } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      employee.employeeId = employeeId || employee.employeeId;
      employee.employeeName = employeeName || employee.employeeName;
      employee.employeeRole = employeeRole || employee.employeeRole;
      employee.employeeDepot = employeeDepot || employee.employeeDepot;
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (employee) {
      res.json({ message: "Employee removed" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
