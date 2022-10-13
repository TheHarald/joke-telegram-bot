import { startCommand, jokeCommand, startText, helpCommand, helpText } from './messages';
import { Anekdot, database } from './../../sequelize/db';
import { Message } from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
dotenv.config()

export function startBot() {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });
    bot.onText(startCommand, (msg: Message) => {
        bot.sendMessage(msg.chat.id, startText);
    });

    bot.onText(helpCommand, async (msg: Message) => {
        bot.sendMessage(msg.chat.id, helpText);
    });

    // bot.onText(jokeCommand, async (msg: Message) => {
    //     const response: any = await Anekdot.findOne({
    //         order: [
    //             Sequelize.fn('RAND'),
    //         ]
    //     })

    //     console.log('anek-> ', response?.text);
    //     bot.sendMessage(msg.chat.id, response?.text);
    // });

    bot.onText(jokeCommand, async (msg: Message) => {

        connection.query('SELECT id, cat, CAST(CONVERT(text USING LATIN1) AS BINARY) USING UTF8) AS text FROM anek ORDER BY RAND() LIMIT 1', (err, rows) => {
            if (err) {
                console.log('error-> ', err);
            }
            console.log('anek-> ', rows);
            bot.sendMessage(msg.chat.id, rows[0].text);
        });

    });


}

