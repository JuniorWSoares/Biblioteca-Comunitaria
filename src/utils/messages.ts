export interface FlashMessages {
    success: Array<{
        title: string;
        message: string;
    }> | null;
    error: Array<{
        title: string;
        message: string;
    }> | null;
}

export function messagesByCookie(req: any, res: any): void{
    const messages: FlashMessages = req.cookies.messages
        ? JSON.parse(req.cookies.messages)
        : { success: [], error: [] }
    res.clearCookie("messages")
    res.locals.messages = messages
}

export function setMessages(type: "success" | "error", title: string, message: string): FlashMessages{
    const messages: FlashMessages = { success: null, error: null }
    messages[type] = [{ title, message }]
    return messages
}