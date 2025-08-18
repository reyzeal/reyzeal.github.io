---
title: RFID Linen Tracker
date: 2025-08-01
description: RFID Linen Tracker adalah sistem full web-based untuk memonitor linen secara real-time menggunakan RFID devices.
tags:
  - portfolio
tech:
  - solid
  - typescript
  - bun
  - tailwind

---

Tech Stack: Solid.js, TanStack Query & Table, TanStack Router, TailwindCSS, TCP/IP & Plug-n-Play RFID Devices

## Overview
RFID Linen Tracker adalah sistem full web-based untuk memonitor linen secara real-time menggunakan RFID devices. Sistem ini mendukung mode Plug-n-Play dan TCP/IP, sehingga mudah diintegrasikan dengan berbagai perangkat. Data UID yang terbaca dari RFID kemudian dicocokkan secara otomatis dengan database, memastikan tracking akurat dan efisien.

## Key Features
- 🌐 Web-based interface menggunakan Solid.js dan TailwindCSS untuk UI yang cepat dan responsif.
- 📊 Data management & visualization dengan TanStack Table & Query untuk update realtime dan filtering data linen.
- 🔄 Flexible device connectivity: Plug-n-Play atau TCP/IP mode, mendukung berbagai jenis RFID reader.
- 🔍 Automatic UID matching: setiap UID dari perangkat dicek terhadap database untuk memastikan akurasi inventory.

## Challenges & Solutions


Challenge: Sinkronisasi data real-time dari multiple RFID devices.
Solution: Menggunakan TanStack Query untuk polling & caching data secara efisien.


Challenge: Menyajikan data dalam jumlah besar tanpa lag.
Solution: TanStack Table dengan virtual scrolling & TailwindCSS untuk rendering cepat dan UI ringan.


## Outcome

Sistem mempermudah tracking linen secara akurat dan cepat di skala besar.

Mendukung monitoring inventory real-time sehingga mengurangi kehilangan linen dan memaksimalkan efisiensi operasional.