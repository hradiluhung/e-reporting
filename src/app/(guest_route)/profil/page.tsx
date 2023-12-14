"use client"
import { getAllLembaga } from "@/controllers/lembaga-controller"
import React, { useEffect, useState } from "react"

export default function Page() {
  const [isError, setIsError] = useState(false)
  const [lembagas, setLembagas] = useState<Lembaga[]>([])

  const fetchAllLembaga = async () => {
    const res = await getAllLembaga()
    setLembagas(res.data)
  }

  useEffect(() => {
    fetchAllLembaga()
  }, [])

  return <div>page</div>
}
