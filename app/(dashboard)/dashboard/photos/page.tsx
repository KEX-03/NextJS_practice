"use client"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import Image from "next/image"

interface Photo { id: number; albumId: number; title: string; thumbnailUrl: string }

async function fetchPhotos(): Promise<Photo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos")
  if (!res.ok) throw new Error("Something went wrong")
  return res.json()
}

const ROW_HEIGHT = 116

export default function Photos() {
  const parentRef = useRef<HTMLDivElement>(null)
  const { data: photos, isPending, isError } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  })

  const virtualizer = useVirtualizer({
    count: photos?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  })

  if (isError) return <p role="alert">Something went wrong</p>
  if (isPending) return <p>Loading...</p>

  const items = virtualizer.getVirtualItems()

  return (
    <section className="mx-auto max-w-md p-4">
      <p className="mb-2 text-sm text-gray-600">
        Images in the DOM: <strong>{items.length}</strong> of {photos.length}
      </p>

      <div ref={parentRef} className="h-[600px] overflow-auto rounded-lg border">
        <ul className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
          {items.map((row) => {
            const photo = photos[row.index]
            return (
              <li
                key={row.key}
                className="absolute left-0 top-0 flex w-full items-center justify-center"
                style={{ height: row.size, transform: `translateY(${row.start}px)` }}
              >
                <Image
                  className="rounded-lg"
                  src={`https://picsum.photos/id/${photo.id % 1000}/100/100`}
                  alt={photo.title}
                  width={100}
                  height={100}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}