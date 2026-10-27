"use client"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

interface Photo {id: number, albumId: number, title: string}

async function fetchPhotos(): Promise <Photo[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    if (!res.ok) throw new Error("Something went wrong")
    return res.json()
}

function Photos() {
    const { data: photos, isPending, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: fetchPhotos
    })

    if (isError) return <p>Something went wrong</p>
    if (isPending) return <p>Loading...</p>

    return (
        <div>
            {photos.length}
        </div>
    )
}

export default Photos