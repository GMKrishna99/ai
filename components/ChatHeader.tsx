"use client"

import { Companion, Message } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react"

import { useRouter } from "next/navigation"
import { BotAvatar } from "@/components/BotAvatar"
import { useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"


interface ChatHeaderProps {
    companion: Companion & {
        Message: Message[],
        _count: {
            Message: number
        }
    }
}


export const ChatHeader = ({
    companion
}: ChatHeaderProps) => {
    const router = useRouter()
    const { user } = useUser()
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`)

            toast({
                description: "Successfully deleted",
            })
            router.refresh();
            router.push('/')
        } catch (error) {
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }
    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center ">
                <Button onClick={() => router.back()} size='icon' variant='ghost' className="hover:bg-primary/10 rounded-full flex items-center justify-center" >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <BotAvatar src={companion.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold ml-1">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessagesSquare className="w-3 h-3 mr-1" />
                            {companion._count.Message}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground ml-1">
                        Created by @{companion.userName}
                    </p>
                </div>
            </div>
            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="hover:bg-primary/10 rounded-full">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" >
                        <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                            <Edit className="w-4 h-4 mr-2 text-green-500" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="w-4 h-4 mr-2 text-rose-500" />
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}