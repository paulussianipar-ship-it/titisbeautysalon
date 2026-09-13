# Titis Beauty Salon

Welcome to the Titis Beauty Salon web application! This project is designed to provide a premium online experience for our clients, showcasing our services and allowing for easy reservations.

## Features

- **Home Page**: A visually appealing landing page with a slideshow showcasing our salon's ambiance and services.
- **About Page**: Information about Titis Beauty Salon, our mission, and our team.
- **Services Page**: A grid layout displaying all available services, each linked to a detailed service page.
- **Service Detail Pages**: Detailed descriptions and images for each service offered.
- **Reservation System**: Users can make reservations through a user-friendly form, with data saved to localStorage for easy access.
- **Admin Dashboard**: A secure area for salon administrators to manage staff, patients, and view reports.
- **Contact Page**: Contact information and a map to help clients find us easily.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **TypeScript**: For type safety and better development experience.
- **CSS**: Custom styles to enhance the premium feel of the salon's online presence.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd titis-beauty-salon
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Supabase setup

The project includes the database schema in `supabase/migrations` and test records in `supabase/seed.sql`.

1. Install or run the Supabase CLI:
   ```
   npx supabase@latest login
   npx supabase@latest link --project-ref tuarfpghygfgvihwfrsy
   npx supabase@latest db push
   ```
2. Open the Supabase SQL Editor and run `supabase/seed.sql` to insert test services, patients, staff, sales, and reservations.
3. Start the app with `npm run dev`.

The public Supabase URL and publishable key belong in `.env` or `.env.local`. Never expose the service-role key in browser code. Create an admin user in Supabase Authentication before signing in; admin tables require an authenticated Supabase session.

## Directory Structure

- `src/app`: Contains all the application pages and components.
- `src/components`: Reusable components used throughout the application.
- `src/data`: Data files for services and other static content.
- `src/lib`: Utility functions for localStorage and other functionalities.
- `public/images`: Directory for service-related images.

## Contributing

We welcome contributions to improve the Titis Beauty Salon web application. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for visiting Titis Beauty Salon! We look forward to serving you.