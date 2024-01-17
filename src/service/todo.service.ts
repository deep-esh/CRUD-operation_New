/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import { response } from 'express'
const prisma = new PrismaClient()

//POST todos
export const postTodo = async (body: any) => {
    const { title, status } = body
    return await prisma.todo.create({
        data: {
            title,
            status,
        },
    })
}

//GET todos by id
export const getAll = async () => {
    // try{
    //     return await prisma.todo.findMany()
    // }
    // catch(err){
    //     next(err)
    // }
    const result = await prisma.todo.findMany()
    if (result != null) {
        console.log('i am here')
        return result}
    else {
        return 'Database is empty'
    }

}

//GET todos by id
export const getTodo = async (id: any) => {
    try {
        return await prisma.todo.findUniqueOrThrow({
            where: {
                id: Number(id),
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('post not found')
        } else {
            throw err
        }
    }
}

//DELETE  by id
export const deleteTodo = async (id: any) => {
    try {
        await prisma.todo.findUniqueOrThrow({
            where: {
                id: Number(id),
            },
        })
        return await prisma.todo.delete({
            where: {
                id: Number(id),
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('post not found')
        } else {
            throw err
        }
    }
}

//UPDATE by id
export const updateTodo = async (id: any, body: any) => {
    try {
        const { title, status } = body
        return await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                title: title,
                status: status,
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('post not found')
        } else {
            throw err
        }
    }
}
function next(err: any) {
    throw new Error('Function not implemented.')
}
