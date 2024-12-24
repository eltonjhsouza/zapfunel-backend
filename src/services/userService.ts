import prisma from '../config/prisma';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const createUser = async (data: Omit<Prisma.UserCreateInput, 'password'> & { password: string }): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput): Promise<User> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password as string, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};