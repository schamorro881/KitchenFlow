using FluentAssertions;
using KitchenFlow.Api;
using KitchenFlow.Application;
using KitchenFlow.Domain.Common;
using KitchenFlow.Infrastructure;
using NetArchTest.eNet;
using Xunit;
using DependencyInjection = KitchenFlow.Infrastructure.DependencyInjection;

namespace KitchenFlow.ArchitectureTests;

public class ArchitectureTests
{
    private const string DomainNamespace = "KitchenFlow.Domain";
    private const string ApplicationNamespace = "KitchenFlow.Application";
    private const string InfrastructureNamespace = "KitchenFlow.Infrastructure";
    private const string ApiNamespace = "KitchenFlow.Api";

    [Fact]
    public void Domain_Should_Not_Have_Dependency_On_Other_Projects()
    {
        // Arrange
        var assembly = typeof(BaseEntity).Assembly;

        var otherProjects = new[]
        {
            ApplicationNamespace,
            InfrastructureNamespace,
            ApiNamespace
        };

        // Act
        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAny(otherProjects)
            .GetResult();

        // Assert
        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Application_Should_Not_Have_Dependency_On_Infrastructure_And_Api()
    {
        // Arrange
        var assembly = typeof(DependencyInjection).Assembly;

        var otherProjects = new[]
        {
            InfrastructureNamespace,
            ApiNamespace
        };

        // Act
        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAny(otherProjects)
            .GetResult();

        // Assert
        result.IsSuccessful.Should().BeTrue();
    }

    [Fact]
    public void Infrastructure_Should_Not_Have_Dependency_On_Api()
    {
        // Arrange
        var assembly = typeof(ApplicationDbContextFactory).Assembly;

        var otherProjects = new[]
        {
            ApiNamespace
        };

        // Act
        var result = Types
            .InAssembly(assembly)
            .ShouldNot()
            .HaveDependencyOnAny(otherProjects)
            .GetResult();

        // Assert
        result.IsSuccessful.Should().BeTrue();
    }
}
