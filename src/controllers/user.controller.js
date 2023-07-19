const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.selectAll = async (req, res) => {
    try {
        const user = await User.findAndCountAll();
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.selectById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { name, lastName, profile, phone, email, status, role, position, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const updatedUser = {
        name,
        lastName,
        profile,
        phone,
        email,
        status,
        role,
        position,
        password: hashedPassword
      };
  
      await user.update(updatedUser);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message:"this user "})
        }
       await user.destroy();
        res.status(200).json({message: 'delete user'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.register = async (req, res) => {
    try {
        const { name, last_name, profile, phone, email, status, role, position, password } = req.body;
        const existingUser = await User.findOne({ where: { phone } });
        
        if (existingUser) {
          res.status(400).json({ error: 'Phone already registered' });
        } else {
          // Create a new user in the database
          const hashedPassword = await bcrypt.hash(password,10)
         await User.create({
            name,
            last_name,
            profile,
            phone,
            email,
            status,
            role,
            position,
            password:hashedPassword
          });
          res.status(201).json({ message:'Register success' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
      }
}

exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body;
        const user = await User.findOne({ where: { name: user_name } })
        if (!user) {
            return res.status(200).json({ message: "not_super_admin" })
        }
        const checkPassword = bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ message: "Password incorrect. Please try again" });
        }
        const userData = {
            id: user.id,
            name: user.name,
            lastName: user.last_name,
            phone: user.phone,
            email: user.email,
            status: user.status,
            role: user.role,
            profile: user.profile
        }
        const token = await jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "120d" });
       return res.status(200).json({token:token})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}