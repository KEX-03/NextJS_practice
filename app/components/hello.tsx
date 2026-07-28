'use client'

function Hello() {

  console.log('Client Component')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:h-full lg:grid-cols-4 lg:text-left">
        <h2 className={`text-5xl font-semibold`}>
          Vivek is the GOAT!!!{' '}
        </h2>
      </div>        
    </main>
  );
}

export default Hello