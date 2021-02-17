using System;
using AutoFixture;
using AutoFixture.Xunit2;

namespace UnitTests.AutoFixture
{
    public class UseCaseTestAttribute : AutoDataAttribute
    {
        public UseCaseTestAttribute()
            : base(() => new Fixture().Customize(new UseCaseTestCustomization()))
        {
        }
    }
}
