"use client"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import Image from "next/image"

interface Photo {id: number, albumId: number, title: string, thumbnailUrl: string}

async function fetchPhotos(): Promise <Photo[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    if (!res.ok) throw new Error("Something went wrong")
    return res.json()
}

function Photos() {
    const parentRef = useRef<HTMLDivElement>(null)
    const { data: photos, isPending, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: fetchPhotos
    })

    const virtualizer = useVirtualizer({
        count: photos?.length ?? 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 116,
        overscan: 5
    })

    if (isError) return <p>Something went wrong</p>
    if (isPending) return <p>Loading...</p>

    return (
        <div
            ref={parentRef}
            style={{
                height: 600,
                overflow: "auto"
            }}>
                <div 
                    className="relative w-full"
                    style={{
                        height: virtualizer.getTotalSize()
                    }}>
                    <ul>
                        {virtualizer.getVirtualItems().map((row) => {
                            const photo = photos[row.index]
                            return (
                                <li 
                                    className="absolute top-0 left-0 w-full flex items-center justify-center"
                                    key={row.index}
                                    style={{
                                        height: row.size,
                                        transform: `translateY(${row.start}px)`
                                    }}>
                                        <Image
                                            className="rounded-lg"
                                            src={photo.thumbnailUrl}
                                            alt={photo.title}
                                            width={100}
                                            height={100}
                                        />
                                </li>
                            )
                        })}
                    </ul>
            </div>
        </div>
    )
}

export default Photos