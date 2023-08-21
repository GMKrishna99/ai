"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { Companion, Message } from "@prisma/client"

interface ChatClientProps {
    companion: Companion & {
        Message: Message[],
        _count: {
            Message: number
        }
    }
}

export const ChatClient = ({
    companion
}: ChatClientProps) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
        </div>
    )
}